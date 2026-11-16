import { Router } from "express";
import { getAllTags, getAllTagGroups, createTagGroup, deleteTagGroup } from "../service/definer.service.js";

const definerRouter = Router();

// layoutdefiner


definerRouter.get('/layoutdef', getAllTags);
definerRouter.post('/layoutdef', createTagGroup);

definerRouter.get('/taggroups', getAllTagGroups);
definerRouter.delete('/taggroups/:id', deleteTagGroup);


export default definerRouter;