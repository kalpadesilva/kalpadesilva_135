import { Link } from 'react-router-dom';

const RecipeTable = ({ recipes }) => {
    return (
        <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-md'>Number</th>
                    <th className='border border-slate-600 rounded-md'>Recipe Name</th>
                    <th className='border border-slate-600 rounded-md'>Owner</th>
                    <th className='border border-slate-600 rounded-md'>Ingredients</th>
                    <th className='border border-slate-600 rounded-md'>Instructions</th>
                    <th className='border border-slate-600 rounded-md'>Duration(minutes)</th>
                </tr>
            </thead>
            <tbody>
                {recipes.map((recipe, index) => (
                    <tr key={recipe._id} className='h-8'>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {index + 1}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {recipe.name}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {recipe.owner}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {recipe.publishYear}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            <div className='flex justify-center gap-x-4'>

                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RecipeTable;
