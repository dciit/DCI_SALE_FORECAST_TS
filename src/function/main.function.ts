export function getModelGroupOfModelName (modelName:string){
    let modelGroup = '';
    modelName = modelName.substring(0,1);
    if(modelName == '1' || modelName == '2'){
        modelGroup = modelName + 'YC';
    }else if(modelName == 'J'){
        modelGroup = 'SCR';
    }else{
        modelGroup = 'ODM';
    }
    return modelGroup;
}