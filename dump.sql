CREATE TABLE "public"."posts" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"description" TEXT,
	"edited" BOOLEAN NOT NULL DEFAULT FALSE,
	"urlId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"editedAt" TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:00',
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."users" (
	"id" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"pictureId" integer NOT NULL DEFAULT 1,
	"roleId" integer NOT NULL DEFAULT 2,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."pictures" (
	"id" serial NOT NULL,
	"url" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "pictures_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."roles" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "roles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."usersRole" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL UNIQUE,
	"roleId" integer NOT NULL,
	CONSTRAINT "usersRole_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL UNIQUE,
	"token" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."postLikes" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "postLikes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."tags" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."postTags" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"tagId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "postTags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."urls" (
	"id" serial NOT NULL,
	"url" TEXT NOT NULL,
	CONSTRAINT "urls_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk1" FOREIGN KEY ("urlId") REFERENCES "urls"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id");

ALTER TABLE "usersRole" ADD CONSTRAINT "usersRole_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "usersRole" ADD CONSTRAINT "usersRole_fk1" FOREIGN KEY ("roleId") REFERENCES "roles"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "postLikes" ADD CONSTRAINT "postLikes_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "postLikes" ADD CONSTRAINT "postLikes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "postTags" ADD CONSTRAINT "postTags_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "postTags" ADD CONSTRAINT "postTags_fk1" FOREIGN KEY ("tagId") REFERENCES "tags"("id");

INSERT 
    INTO "public"."roles" 
    VALUES (1, 'admin');

INSERT 
    INTO "public"."roles" 
    VALUES (2, 'user');

INSERT 
    INTO "public"."pictures" ("id", "url") 
    VALUES (1, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

INSERT 
    INTO "public"."users" ("id", "email", "password", "username", "roleId") 
    VALUES (1, 'markdiasbr@gmail.com', 'mark1324', 'admin', 1);

INSERT 
    INTO "public"."usersRole" ("userId", "roleId")
    VALUES (1,1);