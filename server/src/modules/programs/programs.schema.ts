import { z } from 'zod';

export const findProgramsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    sort: z.enum(['name', 'createdAt']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }),
});

export const createProgramSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3, 'Name must have at least 3 characters')
      .max(255, 'Name must have less than 255 characters'),
  }),
});

export const createManyProgramsSchema = z.object({
  body: z.array(
    z.object({
      name: z
        .string({
          required_error: 'Name is required',
        })
        .min(3, 'Name must have at least 3 characters')
        .max(255, 'Name must have less than 255 characters'),
    }),
  ),
});

export const updateProgramSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
  }),
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3, 'Name must have at least 3 characters')
      .max(255, 'Name must have less than 255 characters'),
  }),
});

export const deleteProgramSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
  }),
});

export const deleteManyProgramsSchema = z.object({
  body: z.object({
    ids: z.array(
      z.string({
        required_error: 'Ids is required',
      }),
    ),
  }),
});
