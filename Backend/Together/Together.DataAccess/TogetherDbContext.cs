    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Together.DataAccess.Entities;

    namespace Together.DataAccess
    {
        public class TogetherDbContext : IdentityDbContext<IdentityUser>
        {
            public TogetherDbContext(DbContextOptions<TogetherDbContext> options) : base(options)
            {
            }

            public DbSet<UserInfo> UserInfo { get; set; }
            public DbSet<UserAccountLevel> UserAccountLevels { get; set; }
            public DbSet<UserEquipment> UserEquipments { get; set; }
            public DbSet<Sport> Sports { get; set; }
            public DbSet<UserSport> UserSports { get; set; }
            public DbSet<SportExperience> SportExperience { get; set; }
            public DbSet<UserEvent> UserEvents { get; set; }
            public DbSet<EventStatus> EventStatuses { get; set; }
            public DbSet<UserEventRequest> UserEventRequests { get; set; }
            public DbSet<UserFavoriteEvent> UserFavoriteEvents { get; set; }
            public DbSet<Notification> Notifications { get; set; }
            public DbSet<UserEventLocation> UserEventLocations { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                modelBuilder.Entity<UserInfo>(entity =>
                {
                    entity.HasKey(c => c.UserID);
                    entity.ToTable(name: "UserInfo");
                });

                modelBuilder.Entity<UserAccountLevel>(entity =>
                {
                    entity.HasKey(c => c.UserId);
                    entity.ToTable(name: "UserAccountLevel");
                });

                modelBuilder.Entity<UserEvent>(entity =>
                {
                    entity.HasOne(ue => ue.UserInfo)
                          .WithMany(ui => ui.UserEvents)
                          .HasForeignKey(ue => ue.UserId)
                          .HasPrincipalKey(ui => ui.UserID);
                });

                modelBuilder.Entity<UserFavoriteEvent>(entity =>
                {
                    entity.HasOne(ufe => ufe.UserInfo)
                          .WithMany(ui => ui.UserFavoriteEvents)
                          .HasForeignKey(ufe => ufe.UserId);

                    entity.HasOne(ufe => ufe.UserEvent)
                          .WithMany(ue => ue.UserFavoriteEvents)
                          .HasForeignKey(ufe => ufe.EventId);
                });
                
                modelBuilder.Entity<UserEventRequest>(entity =>
                {
                    entity.HasOne(ue => ue.UserEvent)
                          .WithMany(ue => ue.UserEventRequest)
                          .HasForeignKey(ue => ue.UserEventId);
                    
                    entity.HasOne(ue=> ue.GuestUserInfo)
                          .WithMany(ui => ui.UserEventRequests)
                          .HasForeignKey(ue => ue.GuestUserId)
                          .HasPrincipalKey(ui => ui.UserID);
                });
                
                modelBuilder.Entity<Notification>(entity =>
                {
                    entity.HasKey(c => c.NotificationId);
                    entity.ToTable(name: "Notifications");
                });
                
                modelBuilder.Entity<UserEventLocation>(entity =>
                {
                    entity.HasKey(c => c.UserEventLocationId);
                    entity.ToTable(name: "UserEventLocations");
                    
                    entity.HasOne(uel => uel.UserEvent)
                          .WithMany(ue => ue.UserEventLocations)
                          .HasForeignKey(uel => uel.UserEventId);
                });
            }
        }
    }
