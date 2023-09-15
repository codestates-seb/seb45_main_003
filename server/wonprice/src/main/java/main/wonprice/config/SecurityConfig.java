package main.wonprice.config;

import lombok.AllArgsConstructor;
import main.wonprice.auth.exception.CustomAuthenticationEntryPoint;
import main.wonprice.auth.filter.JwtAuthenticationFilter;
import main.wonprice.auth.filter.JwtVerificationFilter;
import main.wonprice.auth.handler.CustomAccessDeniedHandler;
import main.wonprice.auth.handler.CustomAuthenticationFailureHandler;
import main.wonprice.auth.handler.CustomAuthenticationSuccessHandler;
import main.wonprice.auth.jwt.service.JwtService;
import main.wonprice.auth.utils.CustomAuthorityUtils;
import main.wonprice.domain.member.repository.MemberRepository;
import main.wonprice.domain.member.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@AllArgsConstructor
public class SecurityConfig {

    private final CustomAuthorityUtils authorityUtils;
    private final JwtService jwtService;
    private final MemberRepository memberRepository;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin() // 없으면 h2 콘솔 접속 안됨..
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 새션 생성 안함
                .and()
                .formLogin().disable()
                .logout()
                .logoutUrl("/logout")
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
                .and()
                .httpBasic().disable() // 헤더에 id password를 실어 나르며 인증하는 방식 비활성화
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                                .antMatchers("/members/all").hasRole("ADMIN")

                                .antMatchers("/notifications/announce").hasRole("ADMIN")
                                .antMatchers("/notifications/*").hasRole("USER")

                                .antMatchers(HttpMethod.PATCH).hasRole("USER")
                                .antMatchers(HttpMethod.DELETE).hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/members/all").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.PATCH, "/members/*").hasRole("USER")
//                        .antMatchers(HttpMethod.DELETE, "/members/*").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/members/profile").hasRole("USER")
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://wonprice-seb45-003.s3-website.ap-northeast-2.amazonaws.com", "*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedMethods(List.of("PUT", "POST", "GET", "PATCH", "DELETE", "OPTIONS"));
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
//        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtService);
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler(memberRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtService, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
