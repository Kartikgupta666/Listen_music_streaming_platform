import Supabase from "./Supabase";

const SavePlaylist = async (id, playlist) => {
    const { data, error } = await Supabase.from('playlist').insert([
        {
            user_id: id,
            playlist_name: playlist,
            song_list: []
        }
    ]);
    if (error) {
        console.error("Failed to save playlist:", error);
        return null;
    }
    return data;
}

const AddToPlaylist = async (song, id) => {
    try {
        const { data, error } = await Supabase.from('playlist').select('song_list').eq('playlist_id', id).single();
        if (error) {
            console.error("Error fetching playlist:", error);
            return;
        }
        let updatedSongs = data.song_list || [];  // Ensure it's an array
        updatedSongs.push(song);  // Append the new object
        const { error: updateError } = await Supabase
            .from("playlist")
            .update({ song_list: updatedSongs })
            .eq("playlist_id", id);

        if (updateError) {
            console.error("Error updating playlist:", updateError);
        } else {
            console.log("Song added successfully!");
        }
    }
    catch (err) {
        console.log(err)
    }
}


export { SavePlaylist, AddToPlaylist }