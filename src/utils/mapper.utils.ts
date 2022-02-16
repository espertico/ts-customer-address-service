import { get } from 'lodash';
/**
 * It returns and object containing a fieldName and a fieldValue.
 *  ex: { fieldName: fieldValue}
 * If necessary a default value to be retuned can be provided, if not provided and no filedValue is available on the provided path and empty object will be returned as a response.
 * @param fieldName the string to be used as attribute name.
 * @param fieldPath the path within the object were the seeked value is located.
 * @param item Object to be searched in.
 * @param defaultValue The default value to use in case none is found in the specified path
 */
export const getMappingForField = (
    fieldName: string,
    fieldPath: string,
    item: any,
    defaultValue?: any
): { [name: string]: string } | {} => {
    const fieldValue = get(item, fieldPath, defaultValue != null ? defaultValue : null);
    if (fieldValue != null) {
        return { [fieldName]: fieldValue };
    }
    return {};
};

/**
 * Formats an string date into an string date in British format `en-GB` => dd/mm/yyyy
 * @param date string
 */
export const formatDateToBritishFormat = (date: string): string => {
    return date ? new Intl.DateTimeFormat('en-GB').format(Date.parse(date)) : '';
};
