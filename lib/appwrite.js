import { Client, Account, ID, Avatars } from "react-native-appwrite";

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
const avatars = new Avatars(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)
    await Signin()
  } catch (error) {
    throw new Error(error);
  }
};

export const Signin = async () => {
    
}
