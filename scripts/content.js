// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

let player, video, adActive = false;
const adClasses = ['ad-showing', 'ad-interrupting'];
const observer = new MutationObserver(handleMutation);

function adPresent(target) {
  return adClasses.some((el) => target.classList.contains(el))
}

function skipAd() {
  video = player.querySelector('video');
  if (adPresent(player) && video.duration > 0 && video.currentTime !== video.duration) {
    video.currentTime = video.duration;
  }
  player.querySelector('.ytp-ad-skip-button-modern.ytp-button')?.click();
  if (adActive) {
    setTimeout(skipAd, 100);
  }
}

function handleMutation(mutationList) {
  const mutation = mutationList[mutationList.length - 1];
  if (adActive !== adPresent(mutation.target)) {
    adActive = !adActive;
    if (adActive) {
      skipAd();
    }
  }
}

function init() {
  player = document.querySelector('#movie_player');
  if (player) {
    observer.observe(player, { attributes: true, attributeFilter: ['class'] });
  } else {
    setTimeout(init, 50);
  }
}

init();
