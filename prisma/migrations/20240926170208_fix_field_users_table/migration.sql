-- CreateTable
CREATE TABLE `auth` (
    `userid` INTEGER NOT NULL DEFAULT 0,
    `zoneid` INTEGER NOT NULL DEFAULT 0,
    `rid` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`userid`, `zoneid`, `rid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forbid` (
    `userid` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL DEFAULT 0,
    `ctime` DATETIME(0) NOT NULL,
    `forbid_time` INTEGER NOT NULL DEFAULT 0,
    `reason` BLOB NOT NULL,
    `gmroleid` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`userid`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `iplimit` (
    `uid` INTEGER NOT NULL DEFAULT 0,
    `ipaddr1` INTEGER NULL DEFAULT 0,
    `ipmask1` VARCHAR(2) NULL DEFAULT '',
    `ipaddr2` INTEGER NULL DEFAULT 0,
    `ipmask2` VARCHAR(2) NULL DEFAULT '',
    `ipaddr3` INTEGER NULL DEFAULT 0,
    `ipmask3` VARCHAR(2) NULL DEFAULT '',
    `enable` CHAR(1) NULL DEFAULT '',
    `lockstatus` CHAR(1) NULL DEFAULT '',

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `point` (
    `uid` INTEGER NOT NULL DEFAULT 0,
    `aid` INTEGER NOT NULL DEFAULT 0,
    `time` INTEGER NOT NULL DEFAULT 0,
    `zoneid` INTEGER NULL DEFAULT 0,
    `zonelocalid` INTEGER NULL DEFAULT 0,
    `accountstart` DATETIME(0) NULL,
    `lastlogin` DATETIME(0) NULL,
    `enddate` DATETIME(0) NULL,

    INDEX `IX_point_aidzoneid`(`aid`, `zoneid`),
    PRIMARY KEY (`uid`, `aid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usecashlog` (
    `userid` INTEGER NOT NULL DEFAULT 0,
    `zoneid` INTEGER NOT NULL DEFAULT 0,
    `sn` INTEGER NOT NULL DEFAULT 0,
    `aid` INTEGER NOT NULL DEFAULT 0,
    `point` INTEGER NOT NULL DEFAULT 0,
    `cash` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 0,
    `creatime` DATETIME(0) NOT NULL,
    `fintime` DATETIME(0) NOT NULL,

    INDEX `IX_usecashlog_creatime`(`creatime`),
    INDEX `IX_usecashlog_uzs`(`userid`, `zoneid`, `sn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usecashnow` (
    `userid` INTEGER NOT NULL DEFAULT 0,
    `zoneid` INTEGER NOT NULL DEFAULT 0,
    `sn` INTEGER NOT NULL DEFAULT 0,
    `aid` INTEGER NOT NULL DEFAULT 0,
    `point` INTEGER NOT NULL DEFAULT 0,
    `cash` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 0,
    `creatime` DATETIME(0) NOT NULL,

    INDEX `IX_usecashnow_creatime`(`creatime`),
    INDEX `IX_usecashnow_status`(`status`),
    PRIMARY KEY (`userid`, `zoneid`, `sn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `ID` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(32) NOT NULL DEFAULT '',
    `passwd` VARCHAR(64) NOT NULL,
    `Prompt` VARCHAR(32) NULL DEFAULT '',
    `answer` VARCHAR(32) NULL DEFAULT '',
    `truename` VARCHAR(32) NULL DEFAULT '',
    `idnumber` VARCHAR(32) NULL DEFAULT '',
    `email` VARCHAR(64) NOT NULL DEFAULT '',
    `mobilenumber` VARCHAR(32) NULL DEFAULT '',
    `province` VARCHAR(32) NULL DEFAULT '',
    `city` VARCHAR(32) NULL DEFAULT '',
    `phonenumber` VARCHAR(32) NULL DEFAULT '',
    `address` VARCHAR(64) NULL DEFAULT '',
    `postalcode` VARCHAR(8) NULL DEFAULT '',
    `gender` INTEGER NULL DEFAULT 0,
    `birthday` DATETIME(0) NULL,
    `creatime` DATETIME(0) NULL,
    `qq` VARCHAR(32) NULL DEFAULT '',
    `passwd2` VARCHAR(64) NULL,

    UNIQUE INDEX `IX_users_name`(`name`),
    INDEX `IX_users_creatime`(`creatime`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
