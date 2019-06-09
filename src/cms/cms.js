import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";
import { Table, TablePreview } from "./widgets/Table";
// import AboutPagePreview from "./preview-templates/AboutPagePreview";
// import NewsPostPreview from "./preview-templates/NewsPostPreview";
// import ProductPagePreview from "./preview-templates/ProductPagePreview";
// import IndexPagePreview from "./preview-templates/IndexPagePreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerWidget("table", Table, TablePreview);

// CMS.registerPreviewTemplate("index", IndexPagePreview);
// CMS.registerPreviewTemplate("about", AboutPagePreview);
// CMS.registerPreviewTemplate("products", ProductPagePreview);
// CMS.registerPreviewTemplate("news", NewsPostPreview);
