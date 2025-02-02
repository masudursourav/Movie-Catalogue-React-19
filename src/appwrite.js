import { Client, Databases, ID, Query } from "appwrite";

const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(projectID);

const database = new Databases(client);


export async function updateSearchCount(searchTerm, movie){
  try{
    const result = await database.listDocuments(databaseID,collectionID,[
      Query.equal('searchTerm',searchTerm),
    ])
    if (result && result.documents && result.documents.length > 0){
      const document = result.documents[0];
      const count = document.count + 1;
      const updatedDocument = await database.updateDocument(databaseID,collectionID,document.$id,{
        count,
      })
      return updatedDocument;
    }else{
      const newDocument = await database.createDocument(databaseID,collectionID,ID.unique(),{
        searchTerm,
        count:1,
        movie_id:movie.id,
        poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      })
      return newDocument;
    }

  }catch(error){
    console.log(error);
  }
}