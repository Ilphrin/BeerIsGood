import React from 'react';
import { TouchableOpacity } from 'react-native';
import { render, fireEvent } from 'react-native-testing-library';

import Button from './Button';

describe('components/Button', () => {
  it('should call onPress', () => {
    const fn = jest.fn();
    const { getAllByType } = render(<Button onPress={fn} text="Coucou'" />);
    const touchable = getAllByType(TouchableOpacity);
    fireEvent.press(touchable[0]);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
