import React from "react";
import { GITHUB_USER_ID } from '../../config';

export default function GithubAvatarIcon() {
  return (<img className="w-7 inline-block rounded-full" src={`https://avatars.githubusercontent.com/u/${GITHUB_USER_ID}?v=4`} width="40" height="40" alt="GitHub Avatar"/>);
};
