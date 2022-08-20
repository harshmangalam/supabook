# Nextjs Supabase Social Media Web App

[Deployed on vercel](https://supabase-hack.vercel.app/)

## Tech Stack

- Nextjs
- Supabase
- SWR
- Chakra UI
- Typescript
- React icons
- Yup
- React hook form

## Features

- Authentication

  - [x] Signup
  - Login
    - [x] Login with email and password
    - [x] Login with magic link
    - Oauth login
      - [ ] Login with Google
      - [ ] Login with Facebook
      - [ ] Login with Github
      - [ ] Login with Linkedin
      - [ ] Login with Spotify
      - [ ] Login with Apple
  - [ ] Password reset
  - [x] Protected routes

- Post

  - [x] Create post
  - [x] Delete post
  - [ ] Like post
  - [ ] Like count
  - [ ] Comment count
  - [ ] Comment post
  - [ ] Share post
  - [ ] Share count
  - [ ] Tag friends
  - [ ] Share live location
  - [ ] Bookmark post
  - [x] Show author profile from post

- Friends
  - [x] Show friends list
  - [x] Show friends request sent list
  - [x] Show friends request received list
  - [x] Send friend request
  - [x] Accept friend request
  - [x] Ignore friend request
  - [x] Cancel sent friend request
  - [x] Unfriend friend
  - [ ] Show friends of friends
- Profile

  - [x] Profile information
  - [x] Friends information
  - [x] Posts information
  - [ ] Edit information
  - [x] Update profile pic
  - [x] Authorize user can update profile pic and profile info
  - [x] Friends count
  - [x] Posts count

- [x] Dark theme
- [ ] Settings
- [ ] Realtime Chat
- [ ] Post details
- [ ] Video calling using webrtc and simple-peer
- [ ] Screen sharing
- [ ] Show all users around coordinate
- [ ] show all friends around there on map coordinates
- [ ] show posts on map coordinate

## Supabase

In this project i have used supabase for

- Database
- Storage
- Authentication

When someone create their account it internally use supabase authentication and also create new row in profile table that extend the user details like profile pic, name , etc...

When authenticated user create new post the data go into supabase post table and if it contain image then first it store to supabase storage and then their path and signed url get stored in post table.

Any authenticated user can visit their profile and change their profile avatar that get stored in supabase storage in avatar folder.

## Supabase Authentication

- Signup using email and password also provide name to be displayed in post and profile

- Login using email and password
- Login using magic link. Magic link will sent to email address and get authenticated when user click on that link

- Upcomming Oauth authentication using google,github,linkedin , etc...

- Supabase authentication is easy to use and utilize.
