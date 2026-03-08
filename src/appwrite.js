import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, anime) => {
    try {
        // 1. Check if the search term already exists in the database
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);

        if (result.documents.length > 0) {
            // 2. If it exists, increment the count
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
        } else {
            // 3. If it doesn't exist, create a new document
            // Jikan uses 'mal_id' for ID and 'images.jpg.image_url' for the poster
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                anime_id: anime.mal_id,
                poster_url: anime.images?.jpg?.image_url || '',
            });
        }
    } catch (error) {
        console.error("Appwrite updateSearchCount error:", error);
    }
};

export const getTrendingAnime = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count"),
        ]);

        return result.documents;
    } catch (error) {
        console.error("Appwrite getTrendingAnime error:", error);
        return [];
    }
};