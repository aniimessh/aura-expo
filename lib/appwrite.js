import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
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
