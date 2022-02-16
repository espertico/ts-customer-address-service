import { formatDateToBritishFormat, getMappingForField } from './mapper.utils';

describe('mapper utils', () => {
    it('should get Mapping For Field', () => {
        const item = {
            level1: 'some-text',
            subItem: {
                level2: 'some-other-text',
                level2Number: 4,
            },
            someArray: [{ inArrayValue: 35 }, { inArrayValue: 68 }],
        };
        expect(getMappingForField('mappedField', 'level1', item)).toEqual({
            mappedField: 'some-text',
        });
        expect(getMappingForField('mappedField', 'subItem.level2Number', item)).toEqual({
            mappedField: 4,
        });
        expect(getMappingForField('mappedField', 'someArray[0].inArrayValue', item)).toEqual({
            mappedField: 35,
        });
        expect(getMappingForField('mappedField', 'someArray[1].inArrayValue', item)).toEqual({
            mappedField: 68,
        });
        expect(getMappingForField('mappedField', 'subItem.unknownField', item)).toEqual({});
        expect(getMappingForField('mappedField', 'subItem.unknownField', item, 25)).toEqual({
            mappedField: 25,
        });
    });

    it('should format date using british format', () => {
        expect(formatDateToBritishFormat(new Date('1994-09-19').toString())).toEqual('19/09/1994');
        expect(formatDateToBritishFormat((null as unknown) as string).toString()).toEqual('');
    });
});
