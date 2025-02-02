import Supabase from "./Supabase";


const fetch_data_from_playlist_ID = async (id) => {

    try {

        let { data, error } = await Supabase
            .from('playlist')
            .select('*').eq('playlist_id', id);

        if (error) {
            console.error("Failed to fetch data:", error);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
}

const deletePlaylist = async (id, onSuccess) => {
    try {

        let {error } = await Supabase
            .from('playlist')
            .delete().eq('playlist_id', id);

        if (error) {
            console.error("Failed to fetch data:", error);
            return null;
        }
        // console.log("Playlist deleted successfully");
        if (onSuccess) onSuccess(); // ✅ Ensure callback exists before calling
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
}

export { fetch_data_from_playlist_ID, deletePlaylist }