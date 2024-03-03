import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        ingredients: {
            type: String,
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);
