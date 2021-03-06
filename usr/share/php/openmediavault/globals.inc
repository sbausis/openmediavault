<?php
/**
 * This file is part of OpenMediaVault.
 *
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2015 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenMediaVault. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @defgroup api The Application Programming Interface
 */

define("_PERMISSION_NA",  0);
define("_PERMISSION_X",   1);
define("_PERMISSION_W",   2);
define("_PERMISSION_WX",  3);
define("_PERMISSION_R",   4);
define("_PERMISSION_RX",  5);
define("_PERMISSION_RW",  6);
define("_PERMISSION_RWX", 7);

define("OMV_NOTIFY_PRECREATE", 0x1);
define("OMV_NOTIFY_CREATE",    0x2);
define("OMV_NOTIFY_PREMODIFY", 0x4);
define("OMV_NOTIFY_MODIFY",    0x8);
define("OMV_NOTIFY_PREDELETE", 0x10);
define("OMV_NOTIFY_DELETE",    0x20);
define("OMV_NOTIFY_EVENT",     0x40);

define("OMV_ROLE_ADMINISTRATOR", 0x1);
define("OMV_ROLE_USER",          0x2);
define("OMV_ROLE_EVERYONE",      OMV_ROLE_ADMINISTRATOR | OMV_ROLE_USER);

define("OMV_RPC_MODE_LOCAL",  0x1);
define("OMV_RPC_MODE_REMOTE", 0x2);

define("OMV_STORAGE_DEVICE_TYPE_HDD", 0x1);
define("OMV_STORAGE_DEVICE_TYPE_SOFTWARERAID", 0x2);
define("OMV_STORAGE_DEVICE_TYPE_HBA", 0x4);
define("OMV_STORAGE_DEVICE_TYPE_LOOPDEVICE", 0x8);
define("OMV_STORAGE_DEVICE_TYPE_DEVICEMAPPER", 0x10);
define("OMV_STORAGE_DEVICE_TYPE_ALL", 0xFF);

define("OMV_NETWORK_INTERFACE_TYPE_ETHERNET", 0x1);
define("OMV_NETWORK_INTERFACE_TYPE_BOND", 0x2);
define("OMV_NETWORK_INTERFACE_TYPE_VLAN", 0x4);
define("OMV_NETWORK_INTERFACE_TYPE_BRIDGE", 0x8);
define("OMV_NETWORK_INTERFACE_TYPE_WIRELESS", 0x10);
define("OMV_NETWORK_INTERFACE_TYPE_VIRTUAL", 0x20);
define("OMV_NETWORK_INTERFACE_TYPE_LOOPBACK", 0x40);
define("OMV_NETWORK_INTERFACE_TYPE_ALL", 0xFF);

// Globals that can be modified via /etc/default/openmediavault.
$GLOBALS['OMV_DEFAULT_FILE'] = "/etc/default/openmediavault";
$GLOBALS['OMV_DEBUG_PHP_LOGFILE'] = "/tmp/openmediavault_debug_php.log";
$GLOBALS['OMV_UUID_UNDEFINED'] = "undefined";
$GLOBALS['OMV_MAX_LOGFILE_LINES'] = "100000";
$GLOBALS['OMV_HTTPREQUEST_TIMEOUT'] = "60000";
$GLOBALS['OMV_ENGINED_DIR'] = "/usr/share/openmediavault/engined";
$GLOBALS['OMV_ENGINED_SO_RPC_HEADER_LENGTH'] = 8;
$GLOBALS['OMV_ENGINED_SO_ADDRESS'] = "/var/lib/openmediavault/engined.sock";
$GLOBALS['OMV_ENGINED_SO_SNDTIMEO'] = 10;
$GLOBALS['OMV_ENGINED_SO_RCVTIMEO'] = 180;
$GLOBALS['OMV_ENGINED_SO_CONNECT_MAX_ATTEMPT'] = 5;
$GLOBALS['OMV_ENGINED_DIRTY_MODULES_FILE'] = "/var/lib/openmediavault/dirtymodules.json";
$GLOBALS['OMV_USERMGMT_ENUMERATE_USER_ROOT'] = TRUE;
$GLOBALS['OMV_PLUGIN_ENUMERATE_GET_REPOSITORY'] = TRUE;
$GLOBALS['OMV_MKFS_OPTIONS_EXT3'] = "-b 4096 -m 0";
$GLOBALS['OMV_MKFS_OPTIONS_EXT4'] = "-b 4096 -m 0";
$GLOBALS['OMV_MKFS_OPTIONS_JFS'] = "-q";
$GLOBALS['OMV_MKFS_OPTIONS_XFS'] = "-f";
$GLOBALS['OMV_MKFS_EXTRAOPTIONS_EXT4_MDADM'] = "-E stride=128,stripe-width=256";
$GLOBALS['OMV_FSTAB_MNTOPS_EXT2'] = "defaults,nofail,user_xattr,noexec";
$GLOBALS['OMV_FSTAB_MNTOPS_EXT3'] = "defaults,nofail,user_xattr,noexec,usrjquota=aquota.user,grpjquota=aquota.group,jqfmt=vfsv0";
$GLOBALS['OMV_FSTAB_MNTOPS_EXT4'] = "defaults,nofail,user_xattr,noexec,usrjquota=aquota.user,grpjquota=aquota.group,jqfmt=vfsv0";
$GLOBALS['OMV_FSTAB_MNTOPS_JFS'] = "defaults,nofail,noexec,usrquota,grpquota";
$GLOBALS['OMV_FSTAB_MNTOPS_XFS'] = "defaults,nofail,noexec,usrquota,grpquota";
$GLOBALS['OMV_FSTAB_MNTOPS_VFAT'] = "defaults,nofail";
$GLOBALS['OMV_FSTAB_MNTOPS_NTFS'] = "defaults,nofail";
$GLOBALS['OMV_FSTAB_MNTOPS_HFSPLUS'] = "defaults,nofail,force";
$GLOBALS['OMV_FSTAB_MNTOPS_BTRFS'] = "defaults,nofail";
$GLOBALS['OMV_FSTAB_MNTOPS_ISO9660'] = "ro";
$GLOBALS['OMV_FSTAB_MNTOPS_UDF'] = "ro";
$GLOBALS['OMV_APT_PLUGINS_INDEX_FILE'] = "/var/lib/openmediavault/apt/pluginsindex.json";
$GLOBALS['OMV_APT_UPGRADE_INDEX_FILE'] = "/var/lib/openmediavault/apt/upgradeindex.json";
$GLOBALS['OMV_NETWORK_INTERFACE_TYPE_NAMES'] = array(
    OMV_NETWORK_INTERFACE_TYPE_ETHERNET => "ethernet",
    OMV_NETWORK_INTERFACE_TYPE_BOND => "bond",
    OMV_NETWORK_INTERFACE_TYPE_VLAN => "vlan",
    OMV_NETWORK_INTERFACE_TYPE_BRIDGE => "bridge",
    OMV_NETWORK_INTERFACE_TYPE_WIRELESS => "wireless",
    OMV_NETWORK_INTERFACE_TYPE_VIRTUAL => "virtual",
    OMV_NETWORK_INTERFACE_TYPE_LOOPBACK => "loopback"
);
// http://www.nightsolo.net/dune/god.html
$GLOBALS['OMV_DUNE_QUOTES'] = array(
    "The beginning of knowledge is the discovery of something ".
      "we do not understand.",
    "He who controls the spice controls the universe.",
    "Try looking into that place where you dare not look! You'll ".
      "find me there, staring out at you!",
    "A large populace held in check by a small but powerful force ".
      "is quite a common situation in our universe. And we know the ".
      "major conditions wherein this large populace may turn upon ".
      "its keepers: When they find a leader. This is the most ".
      "volatile threat to the powerful; they must retain control of ".
      "leaders. When the populace recognizes its chains. Keep the ".
      "populace blind and unquestioning. When the populace perceives ".
      "a hope of escape from bondage. They must never even believe ".
      "that escape is possible!",
    "I must not fear. Fear is the mind-killer. Fear is the ".
      "little-death that brings total obliteration. I will face my ".
      "fear. I will permit it to pass over me and through me. And ".
      "when it has gone past I will turn the inner eye to see its ".
      "path. Where the fear has gone there will be nothing. Only I ".
      "will remain.",
    "People always fear the unknown, if they are truthful about ".
      "it. But i can face my fears.",
    "Fear is the mind-killer.",
    "Without change something sleeps inside us, and seldom awakens. ".
      "The sleeper must awaken.",
    "What does a mirror look at?"
);

/**
 * Use the following table as reference when defining a regex:
 *  " => \"
 * \w => \\\w
 * \d => \\\d
 *  / => \\\/
 *  \ => \\\\
 *  [ => \\\[
 *  ] => \\\]
 *  $ => \\\?
 *  + => \\\+
 *  * => \\\*
 *  . => \\\.
 *  | => \\\|
 *  ? => \\\?
 *  : => \\\:
 */
$GLOBALS['OMV_JSONSCHEMA_USERNAME'] = '"type":"string","format":"regex","pattern":'.
  '"\/^[_.A-Za-z0-9][-\\\@_.A-Za-z0-9]*\\\$?$\/i"';
$GLOBALS['OMV_JSONSCHEMA_COUNTFIELD'] = '"type":["integer","null"]';
$GLOBALS['OMV_JSONSCHEMA_SORTFIELD'] = '"type":["string","null"]';
$GLOBALS['OMV_JSONSCHEMA_SORTDIR'] ='"type":["string","null"],"format":"regex",'.
  '"pattern":"\/^asc|desc$\/i"';
$GLOBALS['OMV_JSONSCHEMA_UUID'] = '"type":"string","format":"regex","pattern":'.
  '"\/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$\/i"';
$GLOBALS['OMV_JSONSCHEMA_UUID_UNDEFINED'] = '"type":"string","format":"regex",'.
  '"pattern":"\/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|'.
  $GLOBALS['OMV_UUID_UNDEFINED'].'$\/i"';
$GLOBALS['OMV_JSONSCHEMA_UUID_NONE'] = '"type":"string","format":"regex","pattern":'.
  '"\/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|$\/i"';
$GLOBALS['OMV_JSONSCHEMA_UUID_LIST'] = '"type":"string","format":"regex","pattern":'.
  '"\/^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}[,;])*'.
  '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$\/i"';
$GLOBALS['OMV_JSONSCHEMA_DEVICEFILE'] = '"type":"string","format":"regex",'.
  '"pattern":"\/^\\\/dev(\\\/disk\\\/by-id)?\\\/.+$\/i"';
$GLOBALS['OMV_JSONSCHEMA_DEVICEFILE_LIST'] = '"type":"string","format":"regex",'.
  '"pattern":"\/^(.+[,;])*.+$\/i"';
$GLOBALS['OMV_JSONSCHEMA_EMAIL'] = '"type":"string","format":"regex","pattern":'.
  '"\/^(\\\w+)([-+.\'][\\\w]+)*@(\\\w[-\\\w]*\\\.){1,5}([A-Za-z]){2,6}|$\/"';
$GLOBALS['OMV_JSONSCHEMA_SSHPUBKEY_OPENSSH'] = '"type":"string","format":"regex",'.
  '"pattern":"\/^ssh-rsa AAAA[0-9A-Za-z+\\\/]+[=]{0,3}\\\s*([^@]+@[^@]+|.+)*$\/"';
$GLOBALS['OMV_JSONSCHEMA_SSHPUBKEY_RFC4716'] = '"type":"string","format":"regex",'.
  '"pattern":"\/^---- BEGIN SSH2 PUBLIC KEY ----(\\\n|\\\r|\\\f)(.+)'.
  '(\\\n|\\\r|\\\f)---- END SSH2 PUBLIC KEY ----$\/sm"';
$GLOBALS['OMV_JSONSCHEMA_SSHPRIVKEY_RSA'] = '"type":"string","format":"regex",'.
  '"pattern":"\/^-----BEGIN RSA PRIVATE KEY-----(\\\n|\\\r|\\\f)(.+)'.
  '(\\\n|\\\r|\\\f)-----END RSA PRIVATE KEY-----$\/sm"';

// JSON schema describing a file system UUID.
// EXT(2|3|4)/JFS/XFS: 7725c816-00d8-11e1-ad4c-00221568ca88
// DOS: 7A48-BA97
// NTFS: 2ED43920D438EC29
// ISO9660: 2015-04-25-12-52-13-00
$GLOBALS['OMV_JSONSCHEMA_FILESYSTEM_UUID'] = '"type":"string","format":"regex",'.
  '"pattern":"\/^([a-f0-9]{4}-[a-f0-9]{4}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-'.
  '[a-f0-9]{4}-[a-f0-9]{12}|[a-f0-9]{16}|[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-'.
  '[0-9]{2}-[0-9]{2}-[0-9]{2})$\/i"';
// JSON schema describing a file system identifier. This can be a UUID or
// the devicefile of the file system.
$GLOBALS['OMV_JSONSCHEMA_FILESYSTEM_ID'] = '"type":"string","format":"regex",'.
  '"pattern":"\/^([a-f0-9]{4}-[a-f0-9]{4}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-'.
  '[a-f0-9]{4}-[a-f0-9]{12}|[a-f0-9]{16}|[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-'.
  '[0-9]{2}-[0-9]{2}-[0-9]{2}|\\\/dev\\\/.+)$\/i"';
$GLOBALS['OMV_JSONSCHEMA_SHARENAME'] ='"type":["string","null"],"format":"regex",'.
  '"pattern":"\/^[^\\\.]([^\"\\\/\\\\\\\[\\\]\\\:\\\+\\\|\\\<\\\>=;,\\\*'.
  '\\\?\\\. ]+){0,1}([.][^\"\\\/\\\\\\\[\\\]\\\:\\\+\\\|\\\<\\\>=;,\\\*'.
  '\\\?\\\. ]+){0,}$\/i"';
$GLOBALS['OMV_JSONSCHEMA_IPV4'] = '"type":"string","format":"regex","pattern":'.
  '"\/^([1-9][0-9]{0,1}|1[013-9][0-9]|12[0-689]|2[01][0-9]|22[0-3])'.
  '([.]([1-9]{0,1}[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){2}[.]'.
  '([1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-4])$\/i"';
$GLOBALS['OMV_JSONSCHEMA_IPV4_NONE'] = '"type":"string","format":"regex","pattern":'.
  '"\/^([1-9][0-9]{0,1}|1[013-9][0-9]|12[0-689]|2[01][0-9]|22[0-3])'.
  '([.]([1-9]{0,1}[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){2}[.]'.
  '([1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-4])|$\/i"';

// Read the defaults file.
if(posix_access($GLOBALS['OMV_DEFAULT_FILE'], POSIX_F_OK | POSIX_R_OK)) {
  $lines = file($GLOBALS['OMV_DEFAULT_FILE']);
  foreach($lines as $kline => $vline) {
    if(1 == preg_match("/^(OMV_[A-Z0-9_]+)=(\")?([^\"]+)(\")?$/",
      trim($vline), $matches)) {
      $GLOBALS[$matches[1]] = $matches[3];
    }
    unset($matches);
  }
  unset($lines);
}
