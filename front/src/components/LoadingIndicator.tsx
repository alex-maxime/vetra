import { Spinner } from '@ui-kitten/components';
import { ImageProps, StyleSheet, View } from 'react-native';

export const LoadingIndicator = (props: ImageProps): React.ReactElement => (
  <View style={[props.style, style.indicator]}>
    <Spinner size="small" />
  </View>
);

const style = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
