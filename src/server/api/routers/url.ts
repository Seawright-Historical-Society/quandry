import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '~/server/api/trpc';

export const urlRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ alias: z.string(), path: z.string(), password: z.string(), hint: z.string() }))
        .mutation(async ({ ctx, input }) => {
            // Ensure URL doesn't already exist
            const existing = await ctx.db.uRL.findFirst({ where: { alias: input.alias, ownerId: ctx.session.user.id }});
            if(existing) throw new Error("Already exists")

            // Create a URL 
            const url = await ctx.db.uRL.create({
                data: {
                    alias: input.alias,
                    path: input.path,
                    password: input.password,
                    owner: { connect: { id: ctx.session.user.id } },
                    hint: input.hint
                }
            });
            return url;
        }),
    update: protectedProcedure
        .input(z.object({ alias: z.string(), path: z.string(), password: z.string(), id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            // Update
            await ctx.db.uRL.update({ where: { id: parseInt(input.id) }, data: { alias: input.alias, path: input.path, password: input.password } });
            return { success: true }
        }),
    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            // Get all the URLS by the current user
            const userId = ctx.session.user.id;
            const urls = await ctx.db.uRL.findMany({ where: { ownerId: userId } })
            return urls;
        }),
    get: protectedProcedure
        // Get a single URL
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const url = await ctx.db.uRL.findFirst({ where: { id: parseInt(input.id), ownerId: userId } });
            return url;
        }),
    delete: protectedProcedure
    // Delete a URL
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input}) => {
            const userId = ctx.session.user.id;
            return await ctx.db.uRL.delete({ where: { id: parseInt(input.id), ownerId: userId}})
        }),
    isValid: publicProcedure
        .input(z.object({ id: z.string()}))
        .query(async ({ ctx, input}) => {
            // We're really just making sure this page exists 
            const page = await ctx.db.uRL.findFirst({ where: { id: parseInt(input.id) }})
            if(page) return { success: true }
            else return { success: false }
        }),
        // Validate a password for a URL, this is the real magic
    authenticate: publicProcedure
        .input(z.object({ id: z.string(), password: z.string() }))
        .query(async({ ctx, input }) => {
            // Get the page
            const page = await ctx.db.uRL.findFirst({ where: { id: parseInt(input.id)}});
            // If the page is valid, continue
            if(!page) return;
            // Continue onward, validate the password
            const validPassword = page.password === input.password;
            if(validPassword) return page;
        }),
    getHint: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
             // Get the page
             const page = await ctx.db.uRL.findFirst({ where: { id: parseInt(input.id)}});
             // If the page is valid, continue
             if(!page) return;
             // Continue onward, get the hint
             return page.hint;
        }),


})