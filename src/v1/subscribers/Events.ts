import path from "path";
//Prefix because of versioning
const prefix = `${path
  .relative(process.cwd(), __filename)
  .substr(0, path.relative(process.cwd(), __filename).lastIndexOf("/") + 1)}`;
export default {
  standing: {
    subMatchAdded: `${prefix}onSubMatchAdded`,
    init: `${prefix}onStandingInit`,
  },
};
