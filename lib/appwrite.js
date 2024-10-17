import { ToastAndroid } from "react-native";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoints: "https://cloud.appwrite.io/v1",
  projectId: "6708c1980035e43476cd",
  databaseId: "6708c20f0018e3a0b4bc",
  usersCollectionId: "6708cc970028d17401e6",
  videosCollectionId: "6708ccdd000e58d5d272",
  storageId: "6708cf850006e62ebe93",
};

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(appWriteConfig.projectId);
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await Signin(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const Signin = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllPost = async () => {
  try {
    const post = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId
    );

    return post.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPost = async () => {
  try {
    const post = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    return post.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPost = async (query) => {
  try {
    const post = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.search("title", query)]
    );

    return post.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const post = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.equal("creator", userId)]
    );

    return post.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        appWriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else if (type === "video") {
      fileUrl = storage.getFileView(appWriteConfig.storageId, fileId);
    } else {
      ToastAndroid.show("File type not supported", ToastAndroid.SHORT);
    }
    if (!fileUrl) {
      throw new Error("File not found");
    }

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  try {
    if (!file) {
      return;
    }
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };

    const uploadFile = await storage.createFile(
      appWriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newVideo = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        creator: form.userId,
        prompt: form.prompt,
        thumbnail: thumnailUrl,
        video: videoUrl,
      }
    );
    return newVideo;
  } catch (error) {
    throw new Error(error);
  }
};
