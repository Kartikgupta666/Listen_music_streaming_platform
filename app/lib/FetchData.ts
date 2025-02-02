
import Supabase from "./Supabase";

const FetchData = async (id) => {

  try {

    let { data, error } = await Supabase
      .from('playlist')
      .select('*').eq('user_id', id);
    
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

export default FetchData;