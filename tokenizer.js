// We start by tokenizing our input by declaring a function named tokenizer()
function tokenizer(input) {
  // variable current will be our index counter
  var current = 0;
  // tokens will be holding all the tokens we found in our input
  var tokens = [];

  // some regex for later use
  var LETTERS = /[a-zA-Z]/;
  var NEWLINE = /\n/;
  var BACKSLASH = /\\/;
  var WHITESPACE = /\s/;
  var NUMBERS = /[0-9]/;

  // now we start looping through each character of our input
  while(current < input.length) {
    var char = input[current];

    /* From here on, we just compare our current character against all the characters
      thet we accept. If there is a match we add 1 to our current variable, push our
      character as a token to our tokens[] array and continue our loop */
    if (char === '=') {
      tokens.push({
        type: 'equal',
        value: '='
      });
      current++;
      continue;
    }

    if (char === '*') {
      tokens.push({
        type: 'star',
        value: '*'
      });
      current++;
      continue;
    }

    if (char === '#') {
      tokens.push({
        type: 'hash',
        value: '#'
      });
      current++;
      continue;
    }

    if (char === '!') {
      tokens.push({
        type: 'not',
        value: '!'
      });
      current++;
      continue;
    }

    if (char === '[') {
      tokens.push({
        type: 'bracket',
        value: '['
      });
      current++;
      continue;
    }

    if (char === ']') {
      tokens.push({
        type: 'bracket',
        value: ']'
      });
      current++;
      continue;
    }

    if (char === '-') {
      tokens.push({
        type: 'minus',
        value: '-'
      });
      current++;
      continue;
    }

    /* When we are looking for an underline, we need to remember that an underline may be
    the beginning of a name (any name, variable, function, struct, etc.)
    So we have to check if the next character is alphanumeric or again underline; So we
    group them together as 1 token. If the underline is there alone [:()], then we just
    push it as is and continue our loop*/
    if (char === '_') {
      if (LETTERS.test(input[current+1]) || NUMBERS.test(input[current+1]) || input[current+1] === '_') {
        char = input[++current];
        var value = '_';
        while(LETTERS.test(char) || NUMBERS.test(char) || input[current+1] === '_') {
          value += char;
          char = input[++current];
        }
        tokens.push({
          type: 'name',
          value: value
        });
        continue;
      } else {
        tokens.push({
          type: 'name',
          value: '_'
        });
      }
    }

    if (char === '+') {
      tokens.push({
        type: 'plus',
        value: '+'
      });
      current++;
      continue;
    }

    if (char === '/') {
      if (input[++current] === '/') {
        while (current < input.length && !NEWLINE.test(input[current])) {
          current++;
        }
      } else if (input[current] === '*') {
        current++;
        while (current < input.length) {
          if (input[current] === '*' && input[++current] === '/') {
            current++;
            break;
          }
          current++;
        }
      }
      continue;
    }


    if (BACKSLASH.test(char)) {
      tokens.push({
        type: 'backslash',
        value: '\\'
      });
      current++;
      continue;
    }

    if (char === '?') {
      tokens.push({
        type: 'question',
        value: '?'
      });
      current++;
      continue;
    }

    if (char === '<') {
      tokens.push({
        type: 'less',
        value: '<'
      });
      current++;
      continue;
    }

    if (char === '>') {
      tokens.push({
        type: 'greater',
        value: '>'
      });
      current++;
      continue;
    }

    if (char === '|') {
        tokens.push({
          type: 'pipe',
          value: '|'
        });
        current++;
        continue;
    }

    if (char === '&') {
      tokens.push({
        type: 'and',
        value: '&'
      });
      current++;
      continue;
    }

    if (char === '%') {
      tokens.push({
        type: 'percent',
        value: '%'
      });
      current++;
      continue;
    }

    if (char === '$') {
      tokens.push({
        type: 'dollar',
        value: '$'
      });
      current++;
      continue;
    }

    if (char === '@') {
      tokens.push({
        type: 'at',
        value: '@'
      });
      current++;
      continue;
    }

    if (char === '^') {
      tokens.push({
        type: 'caret',
        value: '^'
      });
      current++;
      continue;
    }

    if (char === '~') {
      tokens.push({
        type: 'tilde',
        value: '~'
      });
      current++;
      continue;
    }

    if (char === '`') {
      tokens.push({
        type: 'grave',
        value: '`'
      });
      current++;
      continue;
    }

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      });
      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      });
      current++;
      continue;
    }

    if (char === ':') {
      tokens.push({
        type: 'colon',
        value: ':'
      });
      current++;
      continue;
    }

    if (char === '.') {
      tokens.push({
        type: 'dot',
        value: '.'
      });
      current++;
      continue;
    }

    if(char === ',') {
      tokens.push({
        type: 'comma',
        value: ','
      });
      current++;
      continue;
    }

    if (char === ';') {
      tokens.push({
        type: 'semi',
        value: ';'
      });
      current++;
      continue;
    }

    if (char === '{') {
      tokens.push({
        type: 'curly',
        value: '{'
      });
      current++;
      continue;
    }

    if (char === '}') {
      tokens.push({
        type: 'curly',
        value: '}'
      });
      current++;
      continue;
    }

    // We just ignore WHITESPACE ...
    if(WHITESPACE.test(char)) {
      current++;
      continue;
    }
    // ... and the NEWLINE
    if(NEWLINE.test(char)) {
      current++;
      continue;
    }

    /* If the character is a number, we need to check if the next character is also a number
    in order to push them altogether as 1 number. i.e. if there is 762, we push "762" not "7","6","2" */
    if(NUMBERS.test(char)) {
      var value = '';

      while(NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: 'number',
        value: value
      });
      continue;
    }

    /* while checking for LETTERS, we also check for NUMBERS and UNDERLINE
    (i.e. imagine the input as s0m3_c00l_n4m3) */
    if(LETTERS.test(char)) {
      var value = '';

      while(LETTERS.test(char) || NUMBERS.test(char) || char === '_') {
        value += char;
        char = input[++current];
      }
      // There is a mysterious bug which adds a WHITESPACE to the end of some Words when
      //I push them into an array (??!!?!?!).
      tokens.push({
        type: 'name',
        value: value.replace(/\s/g,'')
      });
      continue;
    }

    /* if the character is a sigle quote or a double quote, we will treat it as a string.
    Until we haven't found the next double quote or single quote, we continue looping.
    When found, then we push the whole value as a string. */
    if(char === '\'') {
      var value = '';
      char = input[++current];

      while(char !== '\''){
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({
        type: 'string',
        value: value
      });
      continue;
    }

    if(char === '"') {
      var value = '';
      char = input[++current];

      while(char !== '"'){
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({
        type: 'string',
        value: value
      });
      continue;
    }

      /*whatever else, we don't know jack! */
    throw new TypeError('Type Error! Unrecognized Character: ' + char);
  }
  return tokens;
}
