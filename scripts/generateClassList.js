const fs=require('fs');
const path=require('path');

const currentDirectory=process.cwd();
const jsonPath=path.join(currentDirectory,"public/json");
const filePath=path.join(jsonPath,'posts.json');
const outputTagsFilePath=path.join(jsonPath,"tags.json");
const outputCategoriesFilePath=path.join(jsonPath,"categories.json");
const postsJsonContents=fs.readFileSync(filePath,'utf8');

const postObjs=JSON.parse(postsJsonContents).map(post=>post);

const tagsObj={};
const categoriesObj={};
postObjs.map(post=>{
    post.tags.map(tag=>{
        if(tagsObj.hasOwnProperty(tag)){
            let preTagObj=[...tagsObj[tag]];
            tagsObj[tag]=[...preTagObj,post];
        }else{
            let newTagObj=[post];
            tagsObj[tag]=[...newTagObj];
        }
    })
})
postObjs.map(post=>{
    post.categories.map(category=>{
        if(categoriesObj.hasOwnProperty(category)){
            let preCategoryObj=[...categoriesObj[category]];
            categoriesObj[category]=[...preCategoryObj,post];
        }else{
            let newCategoryObj=[post];
            categoriesObj[category]=[...newCategoryObj];
        }
    })
})

// console.log(tagsObj);
// console.log(categoriesObj);
fs.writeFileSync(outputTagsFilePath,JSON.stringify(tagsObj,null,2));
fs.writeFileSync(outputCategoriesFilePath,JSON.stringify(categoriesObj,null,2));
console.log("Generated Tags.json and Categories.json successfully!");

