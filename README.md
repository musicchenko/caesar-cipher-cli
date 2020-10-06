# caesar-cipher-cli

You need to initialize packet.json ```npm i```

Next you need to write command like 
```node index.js -a encode -s 7 -i "./input.txt" -o "./output.txt"```

But you also can write input filename by stdin 

CLI accepts 4 options (short alias and full name):
-s, --shift: a shift
-i, --input: an input file
-o, --output: an output file
-a, --action: an action encode/decode
