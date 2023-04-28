const { commons } = require('../commons/helpers/commons');
const { comments } = require('../commons/helpers/comments');

const buildCommentsPayload = (header, body, trailler) => {
  let commentsContent;
  commentsContent = commons.asteriskHyphenLine();
  commentsContent += commons.asteriskSpacedLine();

  header.fields?.forEach((field) => {
    if (!field.filler) {
      commentsContent += comments.commentDescriptionLine('H', field.name, field.description);
    }
  });

  commentsContent += commons.asteriskSpacedLine();

  body?.forEach((group) => {
    group.fields?.forEach((field) => {
      if (!field.filler) {
        commentsContent += comments.commentDescriptionLine(field.inOut, field.name, field.description);
      }
    });
  });

  commentsContent += commons.asteriskSpacedLine();

  if (trailler) {
    trailler.fields?.forEach((field) => {
      if (!field.filler) {
        commentsContent += comments.commentDescriptionLine('T', field.name, field.description);
      }
    });
    commentsContent += commons.asteriskSpacedLine();
  }

  commentsContent += commons.asteriskHyphenLine();
  commentsContent += commons.asteriskSpacedLine();

  return commentsContent;
};

module.exports = { buildCommentsPayload };
