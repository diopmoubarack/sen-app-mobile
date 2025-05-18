import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import Colors from '@/constants/Colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyle.container,
        sizeStyle.container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        isDisabled && variantStyle.disabled,
        style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'text' ? Colors.primary : Colors.white}
        />
      ) : (
        <>
          {leftIcon}
          <Text
            style={[
              styles.text,
              variantStyle.text,
              sizeStyle.text,
              isDisabled && variantStyle.disabledText,
              textStyle,
              leftIcon && { marginLeft: 8 },
              rightIcon && { marginRight: 8 },
            ]}
          >
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%',
  },
});

const variantStyles = {
  primary: StyleSheet.create({
    container: {
      backgroundColor: Colors.primary,
    },
    text: {
      color: Colors.white,
    },
    disabled: {
      backgroundColor: Colors.primary,
    },
    disabledText: {
      color: Colors.white,
    },
  }),
  secondary: StyleSheet.create({
    container: {
      backgroundColor: Colors.secondary,
    },
    text: {
      color: Colors.text.primary,
    },
    disabled: {
      backgroundColor: Colors.secondary,
    },
    disabledText: {
      color: Colors.text.primary,
    },
  }),
  outline: StyleSheet.create({
    container: {
      backgroundColor: Colors.transparent,
      borderWidth: 1,
      borderColor: Colors.primary,
    },
    text: {
      color: Colors.primary,
    },
    disabled: {
      borderColor: Colors.grey[400],
    },
    disabledText: {
      color: Colors.grey[400],
    },
  }),
  text: StyleSheet.create({
    container: {
      backgroundColor: Colors.transparent,
    },
    text: {
      color: Colors.primary,
    },
    disabled: {},
    disabledText: {
      color: Colors.grey[400],
    },
  }),
};

const sizeStyles = {
  small: StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    text: {
      fontSize: 14,
    },
  }),
  medium: StyleSheet.create({
    container: {
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    text: {
      fontSize: 16,
    },
  }),
  large: StyleSheet.create({
    container: {
      paddingVertical: 16,
      paddingHorizontal: 32,
    },
    text: {
      fontSize: 18,
    },
  }),
};