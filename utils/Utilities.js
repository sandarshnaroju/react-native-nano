export const replaceValuesInItemViewObjectsAsperDataGiven = (
  content,
  mapperRes,
) => {
  const modifiedContent = [];

  if (content != null && content.length > 0) {
    content.forEach(element => {
      if (element != null && element.name != null) {
        element.value = mapperRes[element.name];
      }
      if (
        element != null &&
        element.content != null &&
        element.content.length > 0
      ) {
        const modifiedMiniContent =
          replaceValuesInItemViewObjectsAsperDataGiven(
            element.content,
            mapperRes,
          );
        element.content = modifiedMiniContent;
      }
      modifiedContent.push(element);
    });
  }
  return modifiedContent;
};
