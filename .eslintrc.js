module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "react-native",
        "jest",
    ],
    "env": {
      "jest/globals": true,
    },
    "rules": {
      "jsx-a11y/href-no-hash": "off",
      "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
      "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
      "react-native/no-unused-styles": 2,
      "react-native/split-platform-components": 2,
      "react-native/no-inline-styles": 2,
      "react-native/no-color-literals": 2,
      "no-use-before-define": 0,
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "no-console": ["warn", { "allow": ["warn", "error"] }],
    },
    "settings": {
		"import/resolver": {
			"node": {
				"extensions": [
					".js",
					".android.js",
					".ios.js"
				]
			}
		}
	},
};
