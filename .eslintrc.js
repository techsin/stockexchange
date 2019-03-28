module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
      'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
      'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
   parserOptions:  {
      ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
    },
    rules:  {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
    settings:  {
        react:  {
          version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
  };

  
// {
// 	"env": {
// 		"browser": true,
// 		"commonjs": true,
// 		"es6": true,
// 		"node": true
// 	},
// 	"extends": "eslint:recommended",
// 	"parserOptions": {
// 		"ecmaVersion": 2017,
// 		"ecmaFeatures": {
// 			"experimentalObjectRestSpread": true,
// 			"jsx": true
// 		},
// 		"sourceType": "module"
// 	},
// 	"plugins": [
// 		"react"
// 	],
// 	"rules": {
// 		"no-const-assign": "warn",
// 		"no-this-before-super": "warn",
// 		"no-undef": "error",
// 		"no-unreachable": "warn",
// 		"no-unused-vars": "warn",
// 		"constructor-super": "warn",
// 		"valid-typeof": "warn",
// 		"no-console": "off",
// 		"quotes": [
// 			"error",
// 			"double"
// 		]
// 	}
// }
// https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb