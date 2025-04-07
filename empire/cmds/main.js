const config = require("../../config");
const {
  cmd,
  commands
} = require("../command");
const os = require('os');
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
  saveConfig,
  Catbox,
  monospace
} = require("../funcs");
const mode = config.MODE;
const prefix = config.PREFIX;
const botname = global.botname || "ᴇᴍᴘɪʀᴇ_ᴍᴅ";
const {
  notes
} = require("../../database/notes");
cmd({
  'pattern': 'menu',
  'desc': "Get command list",
  'category': "general",
  'filename': __filename
}, async (_0x5a14c5, _0x427e84, _0x2be1df, {
  from: _0x1d16aa,
  quoted: _0x1bbb9c,
  sender: _0x3d7eed,
  pushname: _0xcff90a,
  reply: _0x4d932c
}) => {
  try {
    const _0xa96142 = new Date();
    const _0xf71b18 = {
      'timeZone': "Africa/Lagos",
      'hour12': true
    };
    const _0x1eb08f = _0xa96142.toLocaleTimeString('en-US', _0xf71b18);
    const _0x4b3f7d = _0xa96142.toLocaleDateString('en-US', _0xf71b18);
    const _0x4939d9 = _0xa96142.toLocaleDateString("en-US", {
      'timeZone': "Africa/Lagos",
      'weekday': "long"
    });
    const _0x513450 = runtime(process.uptime());
    const _0x21c82e = (os.totalmem() / 0x400 / 0x400 / 0x400).toFixed(0x2);
    const _0xe25aff = ((os.totalmem() - os.freemem()) / 0x400 / 0x400 / 0x400).toFixed(0x2);
    const _0x2054ae = _0xe25aff + "GB / " + _0x21c82e + 'GB';
    const _0x55b0de = commands.length;
    const _0xb2a956 = commands.reduce((_0x4feb96, _0x361684) => {
      if (_0x361684.pattern && !_0x361684.dontAddCommandList) {
        if (!_0x4feb96[_0x361684.category]) {
          _0x4feb96[_0x361684.category] = [];
        }
        _0x4feb96[_0x361684.category].push(_0x361684.pattern);
      }
      return _0x4feb96;
    }, {});
    const _0x1f8ae1 = "```\n┏━━⟪ " + botname + " ⟫━━⦿\n┃ ✗ Date: " + _0x4b3f7d + "\n┃ ✗ Day: " + _0x4939d9 + "\n┃ ✗ Mem: " + _0x2054ae + "\n┃ ✗ Mode: " + mode + "\n┃ ✗ Owner: " + _0xcff90a + "\n┃ ✗ Plugins: " + _0x55b0de.toString() + "\n┃ ✗ Prefix: [ " + prefix + " ] \n┃ ✗ Time: " + _0x1eb08f + "\n┃ ✗ Uptime: " + _0x513450 + "\n┃ ✗ Version: " + "1.0.0" + "\n┗━━━━━━━━━━━━━━━```\n";
    const _0xf88312 = (_0x59e1f9, _0x54e501) => {
      const _0x58afce = "┌──『 " + monospace(_0x59e1f9.toUpperCase()) + " 』──❖\n";
      const _0x4b4854 = _0x54e501.map(_0x1eb915 => " |  " + monospace(prefix + _0x1eb915)).join("\n");
      return '' + _0x58afce + _0x4b4854 + "\n" + "└──────────────◉\n";
    };
    let _0x36e005 = _0x1f8ae1;
    for (const [_0x490908, _0x4e5905] of Object.entries(_0xb2a956)) {
      _0x36e005 += _0xf88312(_0x490908, _0x4e5905) + "\n";
    }
    await _0x5a14c5.sendMessage(_0x1d16aa, {
      'image': {
        'url': "https://files.catbox.moe/lps6ow.jpg"
      },
      'caption': _0x36e005.trim()
    }, {
      'quoted': _0x427e84
    });
  } catch (_0x65ea13) {
    console.log(_0x65ea13);
    _0x4d932c('' + _0x65ea13);
  }
});
cmd({
  'pattern': 'file',
  'desc': "Get the exact file name where a command is located in the repo.",
  'category': "general",
  'react': '✨',
  'filename': __filename
}, async (_0x1a98d0, _0x4506ca, _0xc1d932, {
  q: _0x26a6ca,
  reply: _0x5f3b78
}) => {
  if (!_0x26a6ca) {
    return _0x5f3b78("Provide a command name to check its file location!");
  }
  const _0x1591cc = commands.find(_0x500ab0 => _0x500ab0.pattern === _0x26a6ca.toLowerCase());
  if (!_0x1591cc) {
    return _0x5f3b78("*❌ No such command found.*");
  }
  let _0x1b20e0 = "*🍁 Command:* " + _0x1591cc.pattern;
  _0x1b20e0 += "\n*🧩 Type:* " + (_0x1591cc.category || 'misc');
  _0x1b20e0 += "\n✨ *File Name:* " + (_0x1591cc.filename || "Not Provided");
  _0x5f3b78(_0x1b20e0);
});
cmd({
  'pattern': "setnote",
  'desc': "Save a note with a title",
  'category': "general",
  'filename': __filename
}, async (_0x333022, _0x2e1f98, _0x28a599, {
  q: _0x25661d,
  quoted: _0x5d4081,
  sender: _0x3903fc,
  reply: _0x584309
}) => {
  try {
    if (!_0x25661d) {
      return _0x584309("Please use this format:\n\n.setnote Title; Note Content");
    }
    const _0x2f48d0 = _0x25661d.split(';');
    if (_0x2f48d0.length < 0x2) {
      return _0x584309("❌ Invalid format! Use:\n.setnote Title; Note Content");
    }
    const _0x40c32b = _0x2f48d0[0x0].trim();
    const _0x23dd47 = _0x5d4081 ? _0x5d4081.text : _0x2f48d0.slice(0x1).join(';').trim();
    await notes.findOneAndUpdate({
      'id': _0x3903fc,
      'title': _0x40c32b
    }, {
      'note': _0x23dd47
    }, {
      'upsert': true,
      'new': true
    });
    _0x584309("✅ *Note Saved!*\n\n📌 *Title:* " + _0x40c32b);
  } catch (_0x35eddc) {
    console.log(_0x35eddc);
    _0x584309("error: " + _0x35eddc);
  }
});
cmd({
  'pattern': "list",
  'desc': "Show all commands and descriptions",
  'react': '📜',
  'category': "general",
  'filename': __filename
}, async (_0x210ece, _0x78b51a, _0x4d2cd3, {
  from: _0x4d0fd9,
  quoted: _0x4ce3f1,
  isCmd: _0xad6063,
  command: _0x38f4e6,
  args: _0xd1463c,
  q: _0x14417c,
  isGroup: _0x314e8b,
  sender: _0x5a6ba2,
  pushname: _0x367395,
  reply: _0x480459
}) => {
  try {
    const _0x2d6b2c = new Date();
    const _0x59a795 = {
      'timeZone': "Africa/Lagos",
      'hour12': true
    };
    const _0x4dd282 = _0x2d6b2c.toLocaleTimeString("en-US", _0x59a795);
    const _0x2d8872 = _0x2d6b2c.toLocaleDateString("en-US", _0x59a795);
    const _0x175a34 = runtime(process.uptime());
    const _0x3c671a = commands.length;
    let _0x1d11f0 = "╭━━〘 ᴇᴍᴘɪʀᴇ-ᴍᴅ 〙────⊷  \n┃ ✭ ᴘʀᴇꜰɪx: " + prefix + "  \n┃ ✭ ᴏᴡɴᴇʀ: " + _0x367395 + "  \n┃ ✭ ᴄᴏᴍᴍᴀɴᴅꜱ: " + _0x3c671a.toString() + "  \n┃ ✭ ᴜᴘᴛɪᴍᴇ: " + _0x175a34 + "  \n┃ ✭ ᴅᴀᴛᴇ: " + _0x2d8872 + "  \n┃ ✭ ᴛɪᴍᴇ: " + _0x4dd282 + "  \n╰━━━━━━━━━━━━━━⊷\n";
    commands.forEach((_0x559efa, _0x3fff8d) => {
      if (_0x559efa.pattern && _0x559efa.desc) {
        _0x1d11f0 += '*' + (_0x3fff8d + 0x1) + " " + monospace(_0x559efa.pattern) + "*\n  " + _0x559efa.desc + "\n";
      }
    });
    await _0x210ece.sendMessage(_0x4d0fd9, {
      'text': _0x1d11f0.trim()
    }, {
      'quoted': _0x78b51a
    });
  } catch (_0x3d429c) {
    console.error(_0x3d429c);
    _0x480459('' + _0x3d429c);
  }
});
cmd({
  'pattern': "menus",
  'desc': "Display bot's uptime, date, time, and other stats",
  'react': '📜',
  'category': "general",
  'filename': __filename
}, async (_0x2007db, _0x147f24, _0x4c9938, {
  from: _0xd7af8f,
  quoted: _0x128d52,
  sender: _0x50ee85,
  pushname: _0x5824f0,
  reply: _0x526528
}) => {
  try {
    const _0x455483 = new Date();
    const _0x374a9f = {
      'timeZone': "Africa/Lagos",
      'hour12': true
    };
    const _0x266311 = _0x455483.toLocaleTimeString("en-US", _0x374a9f);
    const _0x339a05 = _0x455483.toLocaleDateString("en-US", _0x374a9f);
    const _0x30e10f = _0x455483.toLocaleDateString("en-US", {
      'timeZone': "Africa/Lagos",
      'weekday': 'long'
    });
    const _0x4e9cb6 = runtime(process.uptime());
    const _0x5d319e = (os.totalmem() / 0x400 / 0x400 / 0x400).toFixed(0x2);
    const _0x5bbdb5 = ((os.totalmem() - os.freemem()) / 0x400 / 0x400 / 0x400).toFixed(0x2);
    const _0x4092f2 = _0x5bbdb5 + "GB / " + _0x5d319e + 'GB';
    const _0x52fc38 = "\n*🦄 ᴜᴘᴛɪᴍᴇ :* " + _0x4e9cb6 + "  \n*🍁 ᴛᴏᴅᴀʏ ᴅᴀᴛᴇ :* " + _0x339a05 + "  \n*🎗 ɴᴏᴡ ᴛɪᴍᴇ :* " + _0x266311 + "  \n*🎉 ᴛᴏᴅᴀʏ ᴅᴀʏ :* " + _0x30e10f + "  \n\n➮ 𝙵𝚘𝚞𝚗𝚍𝚎𝚛 - ᴇᴍᴘɪʀᴇ ᴛᴇᴄʜ\n➮ ᴜsᴇʀ - " + _0x5824f0 + "  \n➮ ɴᴜᴍ - " + config.OWNER_NUMBER + "  \n➮ ᴍᴇᴍ - " + _0x4092f2 + "  \n\n*🧑‍💻 :* ᴇᴍᴘɪʀᴇ-ᴍᴅ ɪꜱ ɴᴏᴡ ᴀᴠᴀɪʟᴀʙʟᴇ  \n\n╭──❰ *ᴀʟʟ ᴍᴇɴᴜ* ❱  \n│🏮 ʟɪꜱᴛ  \n│🏮 ᴄᴀᴛᴇɢᴏʀʏ  \n│🏮 ʜᴇʟᴘ  \n│🏮 ᴀʟɪᴠᴇ  \n│🏮 ᴜᴘᴛɪᴍᴇ  \n│🏮 ᴡᴇᴀᴛʜᴇʀ  \n│🏮 ʟɪɴᴋ  \n│🏮 ᴄᴘᴜ  \n│🏮 ʀᴇᴘᴏꜱɪᴛᴏʀʏ  \n╰─────────────⦁  \n";
    await _0x2007db.sendMessage(_0xd7af8f, _0x52fc38, {
      'quoted': _0x147f24
    });
  } catch (_0x18b0cc) {
    console.error(_0x18b0cc);
    _0x526528('' + _0x18b0cc);
  }
});
cmd({
  'pattern': "getnote",
  'desc': "Retrieve a specific note",
  'category': "general",
  'filename': __filename
}, async (_0x32e7d7, _0xbfaf61, _0x4c9352, {
  q: _0x36a279,
  sender: _0x1b3df3,
  reply: _0x1df7d5
}) => {
  try {
    if (!_0x36a279) {
      return _0x1df7d5("Please specify the note title!\nExample: .getnote Title");
    }
    const _0x312464 = await notes.findOne({
      'id': _0x1b3df3,
      'title': _0x36a279.trim()
    });
    if (!_0x312464) {
      return _0x1df7d5("❌ No note found with this title!");
    }
    _0x1df7d5("📌 *Title:* " + _0x36a279.trim() + "\n📝 *Note:* " + _0x312464.note);
  } catch (_0x265f99) {
    console.log(_0x265f99);
    _0x1df7d5("error: " + _0x265f99);
  }
});
cmd({
  'pattern': "delnote",
  'desc': "Delete a specific note",
  'category': "general",
  'filename': __filename
}, async (_0x1bcd0e, _0x559b46, _0x12727d, {
  q: _0x2b1780,
  sender: _0x476844,
  reply: _0x3f311f
}) => {
  try {
    if (!_0x2b1780) {
      return _0x3f311f("Please specify the note title!\nExample: .delnote Title");
    }
    const _0x3857f0 = await notes.findOneAndDelete({
      'id': _0x476844,
      'title': _0x2b1780.trim()
    });
    if (!_0x3857f0) {
      return _0x3f311f("❌ No note found with this title!");
    }
    _0x3f311f("✅ *Note \"" + _0x2b1780.trim() + "\" deleted successfully!*");
  } catch (_0x3a95e3) {
    console.log(_0x3a95e3);
    _0x3f311f("error: " + _0x3a95e3);
  }
});