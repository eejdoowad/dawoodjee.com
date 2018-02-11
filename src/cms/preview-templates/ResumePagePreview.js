import React from 'react';
import { ResumePageTemplate } from '../../templates/resume-page';

const ResumePagePreview = ({ entry, widgetFor }) => (
  <AboutPageTemplate title={entry.getIn(['data', 'title'])} content={widgetFor('body')} />
);

export default ResumePagePreview;
