import { Router } from "express";
import { getAllTags, getAllTagGroups, createTagGroup } from "../service/definer.service.js";

const layoutDefRouter = Router();

// layoutdefiner

layoutDefRouter.get('/layoutdef', getAllTags);
layoutDefRouter.post('/layoutdef', createTagGroup);
layoutDefRouter.get('/taggroups', getAllTagGroups);

export default layoutDefRouter;