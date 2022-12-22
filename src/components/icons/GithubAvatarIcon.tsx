import React from "react";
import { GITHUB_USER_ID } from '../../config';
import { Image } from '@astrojs/image/components';

export default function GithubAvatarIcon() {
  return (<Image className="w-7 inline-block rounded-full md:group-hover:scale-[1.08] transition-transform duration-300" src={`https://avatars.githubusercontent.com/u/${GITHUB_USER_ID}?v=4`} format="webp" quality={100} width="40" height="40" alt="GitHub Avatar"/>);
};
