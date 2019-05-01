import React from 'react';
import { View, ScrollView } from 'react-native';
import Stars from 'react-native-stars';

import BeerInput from '../BeerInput';
import BeerCarousel from '../BeerCarousel';
import Button from '../../components/Button';
import ColorBox from '../../components/ColorBox';
import container from '../../StyleSheet/container';

const focusableTypes = ['Text', 'Number'];

const validateNumber = number => {
  return /^[0-9\.]*$/.test(number) || number === '';
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { state, changeValueHandlers } = props.fields.reduce(
      (acc, field) => {
        return {
          ...acc,
          state: {
            ...acc.state,
            [field.name]: this.initialValueForField(field),
          },
          changeValueHandlers: {
            ...acc.changeValueHandlers,
            [field.name]: this.changeValueHandlerForField(field),
          },
        };
      },
      { state: {}, changeValueHandlers: {}},
    );

    this.focusableInputRefs = {};

    // Handle input text focus flow
    const {
      autoFocusAttributes,
      returnKeyTypeAttributes,
      blurOnSubmitAttributes,
      onSubmitEditingHandlers,
    } = props.fields
      .filter(field => focusableTypes.includes(field.type))
      .reduce(
        (acc, field, index, filteredFields) => {
          let tmpAcc = { ...acc };

          if (index === 0) {
            tmpAcc = {
              ...tmpAcc,
              autoFocusAttributes: {
                ...tmpAcc.autoFocusAttributes,
                [field.name]: true,
              },
            };
          }

          if (index > 0) {
            this.focusableInputRefs[field.name] = React.createRef();
          }

          if (index >= 0 && index < filteredFields.length - 1) {
            tmpAcc = {
              ...tmpAcc,
              returnKeyTypeAttributes: {
                ...tmpAcc.returnKeyTypeAttributes,
                [field.name]: 'next',
              },
              blurOnSubmitAttributes: {
                ...tmpAcc.blurOnSubmitAttributes,
                [field.name]: false,
              },
              onSubmitEditingHandlers: {
                ...tmpAcc.onSubmitEditingHandlers,
                [field.name]: () => {
                  const nextInput = filteredFields[index + 1];
                  const nextInputRef =
                    nextInput && this.focusableInputRefs[nextInput.name];

                  if (nextInputRef && nextInputRef.current) {
                    nextInputRef.current.focus();
                  }
                },
              },
            };
          }

          return tmpAcc;
        },
        {
          autoFocusAttributes: {},
          returnKeyTypeAttributes: {},
          blurOnSubmitAttributes: {},
          onSubmitEditingHandlers: {},
        },
      );

    this.autoFocusAttributes = autoFocusAttributes;
    this.returnKeyTypeAttributes = returnKeyTypeAttributes;
    this.blurOnSubmitAttributes = blurOnSubmitAttributes;
    this.onSubmitEditingHandlers = onSubmitEditingHandlers;
    this.state = { ...state, errorMessage: '', errors: {} };
    this.changeValueHandlers = changeValueHandlers;
  }

  initialValueForField = (field = {}) => {
    if (field.initialValue) return field.initialValue;

    return '';
  };

  changeValueHandlerForField = (field = {}) => {
    const { type, name } = field;

    if (type === 'Number') {
      return value => {
        if (validateNumber(value)) {
          this.setState({
            [name]: value,
          });
        }
      }
    }

    return value => {
      this.setState({
        [name]: value,
      });
    };
  };

  validateInputs = () => {
    const { fields, validate } = this.props;
    let errors = fields
      .filter(field => !!field.validators && field.validators.length > 0)
      .reduce(
        (acc, field) =>
          field.validators.some(validator => !validator(this.state[field.name]))
            ? { ...acc, [field.name]: field.errorMessage }
            : acc,
        {},
      );

    if (validate) {
      errors = {
        ...errors,
        ...(validate(
          fields.reduce(
            (acc, field) => ({ ...acc, [field.name]: this.state[field.name] }),
            {},
          ),
        ) || {}),
      };
    }

    return errors;
  };

  renderField = (field = {}, index, fields) => {
    const { type, name, options, label, initialValue } = field;
    const {
      [name]: value,
    } = this.state;
    let input;

    if (['Text', 'Number'].includes(type)) {
      const keyboardType = type === 'Number' ? 'numeric' : 'default';
      input = (
        <BeerInput
          inputRef={this.focusableInputRefs[field.name]}
          autoFocus={this.autoFocusAttributes[field.name]}
          returnKeyType={this.returnKeyTypeAttributes[field.name]}
          blurOnSubmit={this.blurOnSubmitAttributes[field.name]}
          onSubmitEditing={this.onSubmitEditingHandlers[field.name]}
          autoCorrect={false}
          onChangeText={this.changeValueHandlers[name]}
          initialValue={initialValue}
          value={value}
          label={label}
          keyboardType={keyboardType}
          {...options}
        />
      );
    }
    else if (type === 'PhotoCarousel') {
      input = (
        <BeerCarousel onChange={this.changeValueHandlers[name]} {...options} data={initialValue} />
      );
    }
    else if (type === 'Color') {
      input = (
        <ColorBox onChange={this.changeValueHandlers[name]} value={initialValue} {...options} />
      )
    }
    else if (type === 'Star') {
      input = (
        <View style={{marginVertical: 20}}>
          <Stars
            default={Number(initialValue)}
            spacing={12}
            count={5}
            starSize={18}
            emptyStar={require('../../../assets/icons/emptyStar.png')}
            backingColor={"#EAEADF"}
            update={this.changeValueHandlers[name]}
          />
        </View>
      )
    }

    return (
      <View key={name}>
      {input}
      </View>
    )
  };

  render() {
    const {
      fields,
      submitButtonOptions,
      onSubmit
    } = this.props;

    return (
      <View style={container}>
        <ScrollView>
          {fields.map(this.renderField)}
        </ScrollView>
        <Button
          onPress={() => onSubmit(this.state)}
          text={'Valider'}
          {...submitButtonOptions}
        />
      </View>
    );
  }
}

export default Form;