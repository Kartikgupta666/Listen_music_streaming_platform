import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import Constants from 'expo-constants';

const supabaseUrl = "";
const supabaseKey = ""
const Supabase = createClient(supabaseUrl, supabaseKey, {
    realtime: {
        // Disable real-time functionality
        disable: true,
    },
});

export default Supabase;
