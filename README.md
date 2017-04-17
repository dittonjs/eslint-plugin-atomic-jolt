# eslint-plugin-atomic-jolt

Custom eslint rules for Atomic Jolt

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-atomic-jolt`:

```
$ npm install eslint-plugin-atomic-jolt --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-atomic-jolt` globally.

## Usage

Add `atomic-jolt` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "atomic-jolt"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "atomic-jolt/rule-name": 2
    }
}
```

## Supported Rules

`no-splat-props // disallow {...this.props} to child react components`
`no-map-raw-html // disallow the returning of raw html elements from map functions`
