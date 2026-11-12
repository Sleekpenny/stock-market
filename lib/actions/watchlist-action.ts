'use server'

import { Watchlist } from "@/database/model/watchlist.model";
import { connectToDB } from "@/database/mongose"

export const getWatchListSymbolByEmail = async(email:string): Promise<string[]> => {
    try {
        const mongoose = await connectToDB();
        const db =  mongoose.connection.db;

        if(!db) throw new Error('Database no found');

        const user = await db.collection('user').findOne<{_id?: unknown; id?: string; email?: string}>({email: email});
        if (!user) return [];
        
        const userId = (user.id as string) || String(user._id || '');
        if (!userId) return [];
        
        const items =  await Watchlist.find({userId}, { symbol: 1}).lean();
        return items.map((item) => String(item.symbol))
    } catch (e) {
        console.log('', e)
        return []
    }
   
}