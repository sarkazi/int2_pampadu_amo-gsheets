const onDefineValueForGS = ({ customFields, customFieldId }) => {
  const targetCustomField = customFields.find(
    (obj) => obj.field_id === customFieldId
  );

  if (!targetCustomField) {
    return "";
  } else {
    return targetCustomField.values.map((obj) => obj.value).join(", ");
  }
};

module.exports = {
  onDefineValueForGS,
};
