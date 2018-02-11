import CMS from 'netlify-cms';
import 'netlify-cms/dist/cms.css';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import ResumePagePreview from './preview-templates/ResumePagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('about', ResumePagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
