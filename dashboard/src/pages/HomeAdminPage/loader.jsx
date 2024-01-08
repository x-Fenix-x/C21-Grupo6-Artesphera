import { getAllCategory } from '../../../../src/services/categories.services';
import { totalProductInDb } from '../../../../src/services/productsDB.services';

export const loader = async () => {
    try {
        const {data: categories} = await getAllCategory();
        
        const {data: totalProducts} = await totalProductInDb()
        
        return {categories, totalProducts};
        
    } catch (error) {
        console.error;
    }
};