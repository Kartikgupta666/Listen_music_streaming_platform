import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import Constants from 'expo-constants';

const supabaseUrl = "https://uznpjciuutupgxxhovbf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6bnBqY2l1dXR1cGd4eGhvdmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNTczODEsImV4cCI6MjA1MzYzMzM4MX0.xwOeJj3qjEYvYtKesL0I4KGhyLokOEIrQNje4N6lbWU"
const Supabase = createClient(supabaseUrl, supabaseKey, {
    realtime: {
        // Disable real-time functionality
        disable: true,
    },
});

export default Supabase;