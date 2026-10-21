// 把插件自带的 skills/ 目录挂成 DSH 的一个 Skill 来源。patch 里的 !!js 拿不到已安装包的
// 路径，所以由这个模块按自己的位置算出目录，再交给 DSH 自带的文件系统 Skill 提供方。
import { fileURLToPath } from 'node:url';
import * as skillFilesystem from '@deepseek-ai/dsh-skill-filesystem';

export const name = 'klox-skills';
export const inject = ['skills'];

export function apply(ctx) {
  ctx.plugin(skillFilesystem, {
    providerName: 'klox',
    includeDefaultRoots: false,
    customSkillDirs: [fileURLToPath(new URL('../skills/', import.meta.url))],
    watch: false,
  });
}
