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
}
if (!plist.includes('NSHealthShareUsageDescription')) {
  plist = plist.replace('<dict>', '<dict>\n<key>NSHealthShareUsageDescription</key><string>Usamos tus pasos diarios de Apple Salud para mostrar tu actividad en el entrenamiento.</string>\n');
}
await writeFile(plistPath, plist, 'utf8');

const entitlementsPath = 'ios/App/App/App.entitlements';
await writeFile(entitlementsPath, `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict><key>com.apple.developer.healthkit</key><true/></dict></plist>
`, 'utf8');

const projectPath = 'ios/App/App.xcodeproj/project.pbxproj';
let project = await readFile(projectPath, 'utf8');
const bundleSetting = 'PRODUCT_BUNDLE_IDENTIFIER = com.ballestomi02.hyroxtraining;';
if (!project.includes(bundleSetting)) throw new Error('Could not find the app bundle identifier in the iOS project.');
project = project.replaceAll(bundleSetting, bundleSetting + '\n\t\t\t\tCODE_SIGN_ENTITLEMENTS = App/App.entitlements;');
await writeFile(projectPath, project, 'utf8');
