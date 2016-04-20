# ASCII Invoice Parser


## Running

- Install Node.js 4.x or later.
- Clone repo locally: `git clone git@github.com:gurdotan/ascii-invoice-parser.git`
- Install dependencies: `cd ascii-invoice-parser && npm install`
- Run:
```
// Usage:
node index.js <INPUT FILE> <OUTPUT FILE>

// Example:
node index.js ./file/input_user_story_1.txt ./files/output_1.txt

// Compare to sample output:
diff files/output_user_story_1.txt files/output_1.txt
```

## Testing

- The tests are located under `spec/`.
- Install Jasmine (http://jasmine.github.io/): `npm install -g jasmine`.  Note that this should be installed as a global Node module. if your Node.js installation was done with `sudo`, you'll probably need to prepend `sudo` to this command as well.
- In the project's root folder, run `jasmine`.
