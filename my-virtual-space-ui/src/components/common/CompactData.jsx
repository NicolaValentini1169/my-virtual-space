import React, { useMemo } from 'react';
import { capitalizeFirstLetter, isString } from '../../utils/utils';
import TextInput from './input/text';
import OptionInput from './input/option';
import { fixAnime } from '../../utils/animeUtils';

const CompactData = ({
  column,
  data,
  setData,
  stateList,
  isChanging = false,
}) => {
  const { label, width, path, editableType } = column;

  const getValue = useMemo(() => {
    if (isString(path) && path.includes('.')) {
      return (
        path.split('.').reduce((acc, split) => {
          return data[split] || acc[split] || '';
        }, '') || ''
      );
    }

    if (isString(path) && isString(data[path])) {
      return data[path];
    }

    return '';
  }, [data, path]);

  const renderInput = useMemo(() => {
    if (isString(editableType) && editableType === 'text') {
      return (
        <TextInput
          changeFunc={e => {
            const copy = { ...data };
            copy[path] = e.currentTarget.value;
            setData(copy);
          }}
          name={path}
          placeholder="Inserisci valore"
          value={getValue}
        />
      );
    }

    if (isString(editableType) && editableType === 'state') {
      return (
        <OptionInput
          name={path}
          changeFunc={e => {
            const copy = { ...data };
            copy['state'] = stateList.find(
              state => state.id === e.currentTarget.value,
            );
            setData(fixAnime(copy));
          }}
          list={stateList}
          field="descrizione"
          selected={data['state']?.id}
        />
      );
    }

    return '';
  }, [editableType, path, getValue, data, setData, stateList]);

  const renderValue = useMemo(() => (isChanging ? renderInput : getValue), [
    getValue,
    isChanging,
    renderInput,
  ]);

  return (
    <div style={{ width, padding: '5px' }}>
      <div style={{ fontWeight: 'bold' }}>{capitalizeFirstLetter(label)}</div>
      <div>{renderValue}</div>
    </div>
  );
};

export default CompactData;
