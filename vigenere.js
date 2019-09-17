function removeSpecial(s) {
  'use strict';
  s = String(s.replace(/[^A-Z0-9]/ig, "")); // remove all special characters and spaces.
  return s;
}

function encryptLetter(l, k) {
  var en, l, k;
  en = l + k; // encrypt letter using vigenere cipher
  if (en > 25) { // mod 26
    en -= 26;
  }
  return en; // output encrypted letter
}

function decryptLetter(l, k) {
  var de, l, k;
  de = l - k; // decrypt letter using vigenere cipher
  if (de < 0) { // mod 26
    de += 26;
  }
  return de; // output decrypted letter
}

function toInt(ttr) {
  var ttr;
  switch (ttr) {
    case "onde":
      ttr = 1;
      break;
    case "sdml":
      ttr = 2;
      break;
    case "ihea":
      ttr = 3;
      break;
    case "kcnp":
      ttr = 4;
      break;
    case "meas":
      ttr = 5;
      break;
    case "pkva":
      ttr = 6;
      break;
    case "mejt":
      ttr = 7;
      break;
    case "pelp":
      ttr = 8;
      break;
    case "omvb":
      ttr = 9;
      break;
  }
  return ttr;
}

function toWrd(ttr) {
  var ttr;
  ttr = parseInt(ttr);
  switch (ttr) {
    case 1:
      ttr = "onde";
      break;
    case 2:
      ttr = "sdml";
      break;
    case 3:
      ttr = "ihea";
      break;
    case 4:
      ttr = "kcnp";
      break;
    case 5:
      ttr = "meas";
      break;
    case 6:
      ttr = "pkva";
      break;
    case 7:
      ttr = "mejt";
      break;
    case 8:
      ttr = "pelp";
      break;
    case 9:
      ttr = "omvb";
      break;
  }
  return ttr;
}


function vigenere(text, key, func, outputClass) {/*
  Where "text" is the message to encrypt/decrypt
  "key" is the passphrase
  "func" is the function, where true=encrypt and false=decrypt
  and "outputClass" is the type of text the output should be returned in (editable text field or HTML element) in the form "br" or "nl"*/
  'use strict';
  var textLength, keyLength, i, l, k, p, enc, dec, e, d;
  key = removeSpecial(key.toLowerCase()); // get the key and remove any special characters (inlcuding spaces)

  switch (outputClass) {
    case "br":
      outputClass = "<br>"; // set the HTML linebreak
      break;
    case "nl":
      outputClass = "\n"; // set the text field linebreak
      break;
  }

  for (i = 0; i < text.length; i += 1) { // repeat for every letter in text
    text = text.replace("<", ""); // remove < from text
    text = text.replace(">", ""); // remove > from text. Text in tags will now be removed from the tag (ie "<br>" --> "br")
    //text = text.replace(/<.*>/, "") // remove everything between < and > (if tag is not closed, everything after < will be deleted)
  }

  textLength = text.length; // set the number of characters in the input to textLength
  keyLength = key.length; // set the number of characters in the key to keyLength
  if (keyLength > textLength) { // if length of the key is more than text
    key = key.substring(0, textLength); // slice key to the number of digits in text
  }

  // Begin cipher:
  for (i=0, p=0, l=[], k=[], e="", d=""; i < textLength; i++, p++) {
    l[i] = (text.charCodeAt(i)) - 97; // define [i]th letter of the input
    if ((l[i] >= 0) && (l[i] <= 25)) { // if the ASCII code is between 0 and 25, apply cipher.
      if (p >= keyLength) { // if the iteration is greater than the length of the key
        p = 0; // reset key iteration to zero
      }
      k[p] = (key.charCodeAt(p)) - 97; // redefine key variable
      enc = parseInt(encryptLetter(l[i], k[p])); // get the encrypted letter
      dec = parseInt(decryptLetter(l[i], k[p])); // get the decrypted letter
      e += String.fromCharCode(97 + enc); // add encrypted letter to encrypted string, converting back to lowercase letter
      d += String.fromCharCode(97 + dec); // add decrypted letter to decrypted string, converting back to lowercase letter
    } else { // if the character is not a lowercase letter.
      if ((l[i] >= -32) && (l[i] <= -7)) { // if the character is a capital letter (-32=A, -7=Z)
        if (p >= keyLength) { // if the iteration is greater than the length of the key
          p = 0; // reset it to zero
        }
        k[p] = (key.charCodeAt(p)) - 97; // redefine key variable (safer out here)
        l[i] += 32; // make letter lowercase for cipher function
        enc = parseInt(encryptLetter(l[i], k[p])); // get the encrypted letter
        dec = parseInt(decryptLetter(l[i], k[p])); // get the decrypted letter
        e += String.fromCharCode(65 + enc); // add encrypted letter to encrypted string, coverting back to capital letter
        d += String.fromCharCode(65 + dec); // add decrypted letter to decrypted string, coverting back to capital letter
      } else { // if character is not a capital or lowercase letter
        if (l[i] == -87) { // if character is a line break
          e += outputClass; // make the output for that letter a line break in the specified format
          d += outputClass; // make the output for that letter a line break in the specified format
          p -= 1; // reformat key
        } else { // if character is not a capital letter, lowercase letter, or linebreak
          e += String.fromCharCode(97 + l[i]); // add special character to encrypted string
          d += String.fromCharCode(97 + l[i]); // add special character to decrypted string
          p -= 1; // reformat key
          }
        }
      }
    }
  // End cipher
  switch (func) { // if true, encrypt is checked. If false, decrypt is checked.
    case true: // user chose encrypt
      return e; // output encrypted message
      break;
    case false: // user chose decrypt
      return d; // output decrypted message
      break;
  }
}