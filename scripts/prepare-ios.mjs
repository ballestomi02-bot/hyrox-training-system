import { readFile, writeFile } from 'node:fs/promises';

const plistPath = 'ios/App/App/Info.plist';
let plist = await readFile(plistPath, 'utf8');
if (!plist.includes('<string>hyroxtraining</string>')) {
  const declaration = `<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array><string>hyroxtraining</string></array>
  </dict>
</array>
`;
  plist = plist.replace('<dict>', '<dict>\n' + declaration);
  await writeFile(plistPath, plist, 'utf8');
}
