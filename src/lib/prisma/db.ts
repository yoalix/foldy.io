import { getCurrentUserProfile } from "../supabase/db";
import { Prisma, PrismaClient } from "@prisma/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/database.types";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export const getExploreUsers = async (supabase: SupabaseClient<Database>) => {
  const currentUser = await getCurrentUserProfile(supabase);

  return prisma.profiles.findMany({
    where: {
      id: {
        not: currentUser?.id,
      },
      followers: {
        none: {
          follower_id: currentUser?.id,
        },
      },
    },
    include: {
      following: true,
      followers: true,
    },
    orderBy: {
      followers: {
        _count: "desc",
      },
    },
    take: 10,
  });
};

export type ExploreUsers = Prisma.PromiseReturnType<typeof getExploreUsers>;

export const getExploreUsersBySearch = async (
  supabase: SupabaseClient<Database>,
  search: string | null
) => {
  if (!search) return null;
  const currentUser = await getCurrentUserProfile(supabase);
  return await prisma.profiles.findMany({
    where: {
      id: {
        not: currentUser?.id,
      },
      OR: [
        {
          username: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          full_name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          folders: {
            some: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
    include: {
      followers: true,

      folders: {
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        include: {
          _count: { select: { links: true } },
        },
      },
    },

    take: 10,
  });
};

export type ExploreUsersBySearch = Prisma.PromiseReturnType<
  typeof getExploreUsersBySearch
>;
